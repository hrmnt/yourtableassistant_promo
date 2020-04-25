import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import API from 'src/api/requests';

import {TypeList} from '../components';
import {connect, ConnectedProps} from 'react-redux';
import {PRODUCT_ACTION} from 'src/types/requestTypes';
import {toggleProduct} from 'src/actions/listActions';
import {Empty} from 'src/components';

type PropsFromRedux = ConnectedProps<typeof connector>;

interface TypeListContainerProps extends PropsFromRedux {
  onBack: () => void;
  id: string;
}

const TypeListContainer: FunctionComponent<TypeListContainerProps> = (
  props,
) => {
  const [items, setItems] = useState([]);

  const handleShows = useCallback(() => {
    API.getDetailedShow(props.id).then((res: any) => {
      setItems(res);
    });
  }, [props.id]);

  const handleItem = useCallback(
    (id: string, action: PRODUCT_ACTION) => {
      props.toggleProduct(id, action);
    },
    [props],
  );

  useEffect(() => {
    handleShows();
  }, []);

  if (items.length === 0) {
    return <Empty onBack={props.onBack} id={props.id} />;
  }

  return (
    <TypeList
      handleItem={handleItem}
      onBack={props.onBack}
      items={items}
      bucket={props.bucket}
      id={props.id}
    />
  );
};

const mapStateToProps = (store: any) => ({
  bucket: store.bucket,
});

const mapDispatchToProps = (dispatch: (arg0: any) => any) => ({
  toggleProduct: (id: string, action: PRODUCT_ACTION) =>
    dispatch(toggleProduct(id, action)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(TypeListContainer);
