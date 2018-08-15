import * as React from "react";
import { DragSource } from "react-dnd";
import Card from "@material-ui/core/Card";
import { RetroContainer } from "./modules/retro";

const cardSource = {
  beginDrag(props: Props) {
    return {
      text: props.text
    };
  }
};
interface Props {
  isDragging?: boolean;
  connectDragSource?: any;
  text: string;
}
@DragSource("CARD", cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export class MyCard extends React.Component<Props> {
  render() {
    const { isDragging, connectDragSource } = this.props;
    return connectDragSource(
      <div>
        <Card>
          <div style={{ opacity: isDragging ? 0.5 : 1 }}>
            <RetroContainer />
          </div>
        </Card>
      </div>
    );
  }
}