import * as React from "react";

export interface ActionsProps {
  fetchRetros: () => void;
  deleteRetro: (retroId: string) => Promise<void>;
  showSnackBar: (message: string) => void;
}

interface RetrosState {
  snackBarMessage?: string;
}

export default class Retros extends React.Component<ActionsProps, RetrosState> {
  handleDeleteRetro: (retroId: string) => void;

  constructor(props: ActionsProps, context?: any) {
    super(props);

    this.state = {};

    this.handleDeleteRetro = (retroId: string) => {
      this.props.deleteRetro(retroId).then(() => {
        this.props.showSnackBar("Retro Deleted");
        this
          .props
          .fetchRetros();
      });
    };
  }

  render() {
    return (
      <div>
        Retros
      </div>
    );
  }
}