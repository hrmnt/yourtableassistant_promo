import fs from 'fs';

// @ts-ignore: no typings
import OptiPng from 'optipng';
import eos from 'end-of-stream';
import intoStream from 'into-stream';
import sharp from 'sharp';

const readSvg = (path: string) => fs.readFileSync(path, {encoding: 'utf8'});
const resizeSvg = (svg: string, size: number) =>
  svg
    .replace(/<svg(.*)width="(\d+)(?:px)?"/, `<svg$1width="${size}"`)
    .replace(/<svg(.*)height="(\d+)(?:px)?"/, `<svg$1height="${size}"`);

const IOS_IMAGE_ASSETS_DIR = 'ios/OKauto/Images.xcassets';
const ANDROID_SRC_DIR = 'android/app/src';

const SOLID_BACKGROUND_COLOR = 'rgb(255, 255, 255)';

const iconBackground = readSvg('./assets/images/icon-background.svg');
const iconForeground = readSvg('./assets/images/icon-foreground.svg');
const iconBadgeDebug = readSvg('./assets/images/icon-badge-debug.svg');
const iconBadgeBeta = readSvg('./assets/images/icon-badge-beta.svg');

/* eslint-disable no-magic-numbers */
const makeAppIconResizer = ({
  size,
  padding = 0,
}: {
  size: number;
  padding?: number;
}) =>
  sharp(Buffer.from(resizeSvg(iconBackground, size + padding)))
    .composite([{input: Buffer.from(resizeSvg(iconForeground, size))}])
    .png();

const makeDebugAppIconResizer = ({
  size: foregroundSize,
  padding = 0,
}: {
  size: number;
  padding?: number;
}) => {
  const backgroundSize = foregroundSize + padding;
  const badgeSize = Math.floor(foregroundSize / 2);

  return intoStream(
    sharp(Buffer.from(resizeSvg(iconBackground, backgroundSize)))
      .composite([
        {input: Buffer.from(resizeSvg(iconForeground, foregroundSize))},
      ])
      .toBuffer(),
  ).pipe(
    sharp()
      .composite([
        {
          input: Buffer.from(resizeSvg(iconBadgeDebug, badgeSize)),
          top: Math.floor(padding / 2) + (foregroundSize - badgeSize),
          left: Math.floor(padding / 2) + (foregroundSize - badgeSize),
        },
      ])
      .png(),
  );
};
const makeBetaAppIconResizer = ({
  size: foregroundSize,
  padding = 0,
}: {
  size: number;
  padding?: number;
}) => {
  const backgroundSize = foregroundSize + padding;
  const badgeSize = Math.floor(foregroundSize / 2);

  return intoStream(
    sharp(Buffer.from(resizeSvg(iconBackground, backgroundSize)))
      .composite([
        {input: Buffer.from(resizeSvg(iconForeground, foregroundSize))},
      ])
      .toBuffer(),
  ).pipe(
    sharp()
      .composite([
        {
          input: Buffer.from(resizeSvg(iconBadgeBeta, badgeSize)),
          top: Math.floor(padding / 2) + (foregroundSize - badgeSize),
          left: Math.floor(padding / 2) + (foregroundSize - badgeSize),
        },
      ])
      .png(),
  );
};
const makeIosSplashResizer = ({
  width,
  height,
}: {
  width: number;
  height: number;
}) => {
  const imageSize = Math.floor(width / 4) * 2;
  let imageWidth = imageSize;
  if (width % 2 !== 0) {
    imageWidth -= 1;
  }
  let imageHeight = imageSize;
  if (height % 2 !== 0) {
    imageHeight -= 1;
  }

  return intoStream(
    sharp(Buffer.from(resizeSvg(iconForeground, imageWidth)))
      .resize(imageWidth, imageHeight)
      .toBuffer()
      // eslint-disable-next-line promise/prefer-await-to-then
      .then(foreground =>
        sharp(Buffer.from(resizeSvg(iconBackground, width)))
          .resize(width, height)
          .composite([{input: foreground}])
          .toBuffer(),
      ),
  ).pipe(sharp().png());
};
const makeAndroidLaunchImageResizer = ({width}: {width: number}) => {
  const imageSize = Math.floor(width / 4) * 2;

  const solidBackground = Buffer.from(
    `
      <svg height="${imageSize}" width="${imageSize}">
        <path d="m0 0h${imageSize}v${imageSize}h-${imageSize}z" fill="${SOLID_BACKGROUND_COLOR} "/>
      </svg>
    `,
  );
  const patches = Buffer.from(
    // prettier-ignore
    `
      <svg height="${imageSize + 4}" width="${imageSize + 4}" xmlns="http://www.w3.org/2000/svg">
        <g fill="${SOLID_BACKGROUND_COLOR}">
          <rect x="1" y="1" width="${imageSize + 2}" height="1" />
          <rect x="1" y="1" width="1" height="${imageSize + 2}" />
          <rect x="1" y="${imageSize + 2}" width="${imageSize + 2}" height="1" />
          <rect x="${imageSize + 2}" y="1" width="1" height="${imageSize + 2}" />
        </g>
        <g fill="black">
          <rect x="1" y="0" width="1" height="1" />
          <rect x="0" y="1" width="1" height="1" />
          <rect x="${imageSize + 2}" y="0" width="1" height="1" />
          <rect x="0" y="${imageSize + 2}" width="1" height="1" />
        </g>
      </svg>
    `,
  );

  return intoStream(
    sharp(solidBackground)
      .composite([{input: Buffer.from(resizeSvg(iconForeground, imageSize))}])
      .toBuffer(),
  ).pipe(
    sharp()
      .extend({
        top: 2,
        bottom: 2,
        left: 2,
        right: 2,
        background: {r: 0, g: 0, b: 0, alpha: 0},
      })
      .composite([{input: patches}])
      .png(),
  );
};
/* eslint-enable no-magic-numbers */

const configs = [
  // ios app icons
  ...[
    {
      dir: `${IOS_IMAGE_ASSETS_DIR}/AppIcon.appiconset`,
      makeResizer: makeAppIconResizer,
    },
    {
      dir: `${IOS_IMAGE_ASSETS_DIR}/AppIcon-Debug.appiconset`,
      makeResizer: makeDebugAppIconResizer,
    },
    {
      dir: `${IOS_IMAGE_ASSETS_DIR}/AppIcon-Beta.appiconset`,
      makeResizer: makeBetaAppIconResizer,
    },
  ]
    .map(({dir, makeResizer}) => [
      {
        resizer: makeResizer({size: 40}),
        path: `${dir}/iphone-20x20@2x.png`,
      },
      {
        resizer: makeResizer({size: 60}),
        path: `${dir}/iphone-20x20@3x.png`,
      },
      {
        resizer: makeResizer({size: 58}),
        path: `${dir}/iphone-29x29@2x.png`,
      },
      {
        resizer: makeResizer({size: 87}),
        path: `${dir}/iphone-29x29@3x.png`,
      },
      {
        resizer: makeResizer({size: 80}),
        path: `${dir}/iphone-40x40@2x.png`,
      },
      {
        resizer: makeResizer({size: 120}),
        path: `${dir}/iphone-40x40@3x.png`,
      },
      {
        resizer: makeResizer({size: 120}),
        path: `${dir}/iphone-60x60@2x.png`,
      },
      {
        resizer: makeResizer({size: 180}),
        path: `${dir}/iphone-60x60@3x.png`,
      },
      {
        resizer: makeResizer({size: 1024}),
        path: `${dir}/iphone-1024x1024.png`,
      },
    ])
    .reduce((a, b) => [...a, ...b]),

  // android app icons
  ...[
    {
      dir: `${ANDROID_SRC_DIR}/main/res`,
      makeResizer: makeAppIconResizer,
    },
    {
      dir: `${ANDROID_SRC_DIR}/debug/res`,
      makeResizer: makeDebugAppIconResizer,
    },
    {
      dir: `${ANDROID_SRC_DIR}/releaseBeta/res`,
      makeResizer: makeBetaAppIconResizer,
    },
  ]
    .map(({dir, makeResizer}) => [
      {
        resizer: makeResizer({size: 48}),
        path: `${dir}/mipmap-mdpi/ic_launcher.png`,
      },
      {
        resizer: makeResizer({size: 72, padding: 18}),
        path: `${dir}/mipmap-mdpi/ic_launcher_foreground.png`,
      },
      {
        resizer: makeResizer({size: 72}),
        path: `${dir}/mipmap-hdpi/ic_launcher.png`,
      },
      {
        resizer: makeResizer({size: 108, padding: 27}),
        path: `${dir}/mipmap-hdpi/ic_launcher_foreground.png`,
      },
      {
        resizer: makeResizer({size: 96}),
        path: `${dir}/mipmap-xhdpi/ic_launcher.png`,
      },
      {
        resizer: makeResizer({size: 144, padding: 36}),
        path: `${dir}/mipmap-xhdpi/ic_launcher_foreground.png`,
      },
      {
        resizer: makeResizer({size: 144}),
        path: `${dir}/mipmap-xxhdpi/ic_launcher.png`,
      },
      {
        resizer: makeResizer({size: 216, padding: 54}),
        path: `${dir}/mipmap-xxhdpi/ic_launcher_foreground.png`,
      },
      {
        resizer: makeResizer({size: 192}),
        path: `${dir}/mipmap-xxxhdpi/ic_launcher.png`,
      },
      {
        resizer: makeResizer({size: 288, padding: 72}),
        path: `${dir}/mipmap-xxxhdpi/ic_launcher_foreground.png`,
      },
    ])
    .reduce((a, b) => [...a, ...b]),

  // ios launch_imagees
  {
    resizer: makeIosSplashResizer({
      width: 1125,
      height: 2436,
    }),
    path: `${IOS_IMAGE_ASSETS_DIR}/LaunchImage.launchimage/LaunchImage-812h@3x.png`,
  },
  {
    resizer: makeIosSplashResizer({
      width: 1242,
      height: 2208,
    }),
    path: `${IOS_IMAGE_ASSETS_DIR}/LaunchImage.launchimage/LaunchImage-736h@3x.png`,
  },
  {
    resizer: makeIosSplashResizer({
      width: 750,
      height: 1334,
    }),
    path: `${IOS_IMAGE_ASSETS_DIR}/LaunchImage.launchimage/LaunchImage-Portrait-667h@2x.png`,
  },
  {
    resizer: makeIosSplashResizer({
      width: 640,
      height: 1136,
    }),
    path: `${IOS_IMAGE_ASSETS_DIR}/LaunchImage.launchimage/LaunchImage-Portrait-retina4@2x.png`,
  },
  {
    resizer: makeIosSplashResizer({
      width: 640,
      height: 960,
    }),
    path: `${IOS_IMAGE_ASSETS_DIR}/LaunchImage.launchimage/LaunchImage-Portrait@2x.png`,
  },

  // android launch_imagees
  {
    resizer: makeAndroidLaunchImageResizer({width: 240}),
    path: `${ANDROID_SRC_DIR}/main/res/drawable-ldpi/launch_image.9.png`,
  },
  {
    resizer: makeAndroidLaunchImageResizer({width: 320}),
    path: `${ANDROID_SRC_DIR}/main/res/drawable-mdpi/launch_image.9.png`,
  },
  {
    resizer: makeAndroidLaunchImageResizer({width: 480}),
    path: `${ANDROID_SRC_DIR}/main/res/drawable-hdpi/launch_image.9.png`,
  },
  {
    resizer: makeAndroidLaunchImageResizer({width: 720}),
    path: `${ANDROID_SRC_DIR}/main/res/drawable-xhdpi/launch_image.9.png`,
  },
  {
    resizer: makeAndroidLaunchImageResizer({width: 960}),
    path: `${ANDROID_SRC_DIR}/main/res/drawable-xxhdpi/launch_image.9.png`,
  },
  {
    resizer: makeAndroidLaunchImageResizer({width: 1280}),
    path: `${ANDROID_SRC_DIR}/main/res/drawable-xxxhdpi/launch_image.9.png`,
  },
];

const assetsBuildShell = async () => {
  try {
    await Promise.all(
      configs.map(
        config =>
          new Promise<void>((resolve, reject) => {
            const pngOptimizer = new OptiPng(['-o3']);
            const writableStream = fs.createWriteStream(config.path);

            eos(config.resizer.pipe(pngOptimizer).pipe(writableStream), err => {
              if (err) {
                reject(err);
              } else {
                console.log(
                  `[scripts/assets-build-shell] ✓ Generated ${config.path}`,
                );

                resolve();
              }
            });
          }),
      ),
    );

    console.log('[scripts/assets-build-shell] ✓ Done');
    process.exit(0);
  } catch (err) {
    console.error(`[scripts/assets-build-shell] ✗ ${err.stack}`);
    process.exit(1);
  }
};

assetsBuildShell();
