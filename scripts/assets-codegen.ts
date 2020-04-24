import fs from 'fs';
import path from 'path';

import globby from 'globby';
import prettier from 'prettier';

const camelCase = (str: string) =>
  str.replace(/^([A-Z])|[\s-_]+(\w)/g, (_match, p1, p2) => {
    if (p2) return p2.toUpperCase();

    return p1.toLowerCase();
  });

const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error(`Usage: ${process.argv[0]} ${process.argv[1]} <output>`);

  process.exit(1);
}

const outputPath = path.resolve(process.cwd(), args[0]);
const rootDir = path.resolve(__dirname, '..');

interface DeepAssetPathMap {
  [key: string]: string | DeepAssetPathMap;
}

const buildAssetPathMap = (
  acc: DeepAssetPathMap,
  assetName: string,
  assetAbsolutePath: string,
): DeepAssetPathMap => {
  if (/@\dx\.png$/.test(assetAbsolutePath)) return acc;

  if (assetName.includes('/')) {
    const assetNameComponents = assetName.split('/');
    const [assetDir, assetNestedName] = [
      assetNameComponents[0],
      assetNameComponents.slice(1).join('/'),
    ];

    return {
      ...acc,
      [assetDir]: buildAssetPathMap(
        // @ts-ignore
        typeof acc[assetDir] === 'object' ? acc[assetDir] : {},
        assetNestedName,
        assetAbsolutePath,
      ),
    };
  }

  return {
    ...acc,
    [assetName]: path.relative(outputPath, assetAbsolutePath),
  };
};
const sourceForAssetPathMap = (assetPathMap: DeepAssetPathMap): string => {
  return Object.entries(assetPathMap)
    .map(([assetNameOrDir, assetRelativePathOrDeepAssetPathMap]) => {
      if (typeof assetRelativePathOrDeepAssetPathMap === 'string') {
        return `'${assetNameOrDir}': require('${assetRelativePathOrDeepAssetPathMap}')`;
      }

      return `'${assetNameOrDir}': {${sourceForAssetPathMap(
        assetRelativePathOrDeepAssetPathMap,
      )}}`;
    })
    .join(', ');
};

const assetsCodegen = async () => {
  try {
    const assetPathsByAssetType = {
      images: await globby(`${rootDir}/assets/images/**/*.{jpg,jpeg,png}`),
      animations: await globby(`${rootDir}/assets/animations/**/*.json`),
    };

    const prettierOptions: prettier.Options = {
      ...(await prettier.resolveConfig(process.cwd())),
      parser: 'typescript',
    };

    Object.entries(assetPathsByAssetType).forEach(
      ([assetType, assetAbsolutePaths]) => {
        const assetPathMap = assetAbsolutePaths.reduce<DeepAssetPathMap>(
          (acc, assetAbsolutePath) => {
            const assetName = camelCase(
              assetAbsolutePath
                .replace(new RegExp(`${rootDir}/assets/[^/]+/`), '')
                .replace(/\.\w+$/, ''),
            );

            return buildAssetPathMap(acc, assetName, assetAbsolutePath);
          },
          {},
        );

        const assetTypeModuleSource = `
          // This file was automatically generated and should not be edited.
          export const ${assetType} = {
            /* eslint-disable global-require */
            ${sourceForAssetPathMap(assetPathMap)}
            /* eslint-enable global-require */
          };
        `;
        const enhancedAssetTypeModuleSource = prettier.format(
          assetTypeModuleSource,
          prettierOptions,
        );

        const filePath = path.resolve(outputPath, `${assetType}.gen.ts`);

        fs.writeFileSync(filePath, enhancedAssetTypeModuleSource);

        // prettier-ignore
        console.log(`[scripts/assets-codegen] ✓ Built ${filePath.replace(`${process.cwd()}/`, '')}`)
      },
    );

    process.exit(0);
  } catch (err) {
    console.error(`[scripts/assets-codegen]: ${err.stack}`);
    process.exit(1);
  }
};

assetsCodegen();
