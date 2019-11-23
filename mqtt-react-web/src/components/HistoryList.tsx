import * as React from 'react';
import {
  DetailsHeader,
  DetailsList,
  IColumn,
  IDetailsHeaderProps,
  IDetailsList,
  IRenderFunction,
  SelectionMode,
} from 'office-ui-fabric-react';


export interface MQTTMessage {
  key: string;
  topic: string;
  payload: string;
  time: string;
  qos: number;
}

export interface IDetailsListGroupedExampleState {
  items: MQTTMessage[];
  showItemIndexInView: boolean;
  isCompactMode: boolean;
}

export default class HistoryList extends React.Component<{}, IDetailsListGroupedExampleState> {
  private _root = React.createRef<IDetailsList>();
  private _columns: IColumn[];

  constructor(props: {}) {
    super(props);

    this.state = {
      items: [
        { key: 'a', topic: 'message', payload: 'Mqtt is still awesome at 21/11/2019 04:39:19 p. m.', time: "2019-11-21T22:39:21.422Z", qos: 0 },
        { key: 'b', topic: 'message', payload: 'Mqtt is still awesome at 21/11/2019 04:39:17 p. m.', time: "2019-11-21T22:39:19.407Z", qos: 0 },
        { key: 'c', topic: 'message', payload: 'Mqtt is still awesome at 21/11/2019 04:39:15 p. m.', time: "2019-11-21T22:39:17.401Z", qos: 0 },
        { key: 'd', topic: 'message', payload: 'Mqtt is still awesome at 21/11/2019 04:39:13 p. m.', time: "2019-11-21T22:39:15.392Z", qos: 0 },
      ],
      showItemIndexInView: false,
      isCompactMode: false
    };

    this._columns = [
      { key: 'topic', name: 'Topic', fieldName: 'topic', minWidth: 100, maxWidth: 100 },
      { key: 'payload', name: 'Payload', fieldName: 'payload', minWidth: 200 },
      { key: 'time', name: 'Time', fieldName: 'time', minWidth: 150, maxWidth: 150 },
      { key: 'qos', name: 'QoS', fieldName: 'qos', minWidth: 50, maxWidth: 50 },
    ];
  }

  public componentWillUnmount() {
    if (this.state.showItemIndexInView) {
      const itemIndexInView = this._root.current!.getStartItemIndexInView();
      alert('first item index that was in view: ' + itemIndexInView);
    }
  }

  public render() {
    const { items, isCompactMode } = this.state;

    return (
      <div style={{ width: "100%" }}>
        <DetailsList
          componentRef={this._root}
          items={items}
          columns={this._columns}
          onRenderDetailsHeader={this._onRenderDetailsHeader}
          onRenderItemColumn={this._onRenderColumn}
          compact={isCompactMode}
          selectionMode={SelectionMode.none}
        />
      </div>
    );
  }

  private _onRenderDetailsHeader(props: IDetailsHeaderProps, _defaultRender?: IRenderFunction<IDetailsHeaderProps>) {
    return <DetailsHeader {...props} ariaLabelForToggleAllGroupsButton={'Expand collapse groups'} />;
  }

  private _onRenderColumn(item: MQTTMessage, index: number, column: IColumn) {
    const value = item && column && column.fieldName ? item[column.fieldName as keyof MQTTMessage] : '';

    return <div data-is-focusable={true}>{value}</div>;
  }
}
