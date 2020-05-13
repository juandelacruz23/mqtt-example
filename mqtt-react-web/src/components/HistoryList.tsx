import * as React from "react";
import {
  DetailsHeader,
  DetailsList,
  IColumn,
  IDetailsHeaderProps,
  IDetailsList,
  SelectionMode,
} from "office-ui-fabric-react";
import { connect } from "react-redux";
import HistoryItem from "../types/HistoryItem";
import { AppState } from "../redux";

export interface HistoryListState {
  showItemIndexInView: boolean;
  isCompactMode: boolean;
}

interface HistoryListProps {
  messages: HistoryItem[];
  topic: string;
}

class HistoryList extends React.Component<HistoryListProps, HistoryListState> {
  private _root = React.createRef<IDetailsList>();
  private _columns: IColumn[];

  constructor(props: HistoryListProps) {
    super(props);

    this.state = {
      showItemIndexInView: false,
      isCompactMode: false,
    };

    this._columns = [
      {
        key: "topic",
        name: "Topic",
        fieldName: "topic",
        minWidth: 150,
        maxWidth: 150,
      },
      {
        key: "payload",
        name: "Payload",
        fieldName: "payload",
        minWidth: 200,
      },
      {
        key: "time",
        name: "Time",
        fieldName: "time",
        minWidth: 200,
        maxWidth: 200,
      },
      {
        key: "qos",
        name: "QoS",
        fieldName: "qos",
        minWidth: 100,
        maxWidth: 100,
      },
    ];
  }

  public componentWillUnmount(): void {
    if (this.state.showItemIndexInView && this._root.current) {
      const itemIndexInView = this._root.current.getStartItemIndexInView();
      alert(`first item index that was in view: ${itemIndexInView}`);
    }
  }

  public render(): JSX.Element {
    const { isCompactMode } = this.state;

    return (
      <div style={{ width: "100%" }}>
        <DetailsList
          componentRef={this._root}
          items={this.props.messages}
          columns={this._columns}
          onRenderDetailsHeader={this._onRenderDetailsHeader}
          onRenderItemColumn={this._onRenderItemColumn}
          compact={isCompactMode}
          selectionMode={SelectionMode.none}
        />
      </div>
    );
  }

  private _onRenderDetailsHeader(props: IDetailsHeaderProps): JSX.Element {
    return (
      <DetailsHeader
        {...props}
        ariaLabelForToggleAllGroupsButton={"Expand collapse groups"}
      />
    );
  }

  private _onRenderItemColumn(
    item: HistoryItem,
    index: number,
    column: IColumn,
  ): JSX.Element {
    const value =
      item && column && column.fieldName
        ? item[column.fieldName as keyof HistoryItem]
        : "";
    return (
      <div data-is-focusable={true}>
        {column.fieldName === "time" ? new Date(value).toISOString() : value}
      </div>
    );
  }
}

function mapStateToProps(state: AppState): HistoryListProps {
  return {
    messages: state.messages,
    topic: state.mqttConfig.topic,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default connect(mapStateToProps)(HistoryList as any);
