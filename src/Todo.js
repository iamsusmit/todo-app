import React, { useState } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
} from "@material-ui/core";
import { db } from "./firebase";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Todo = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const updateTodo = () => {
    db.collection("todos").doc(props.text.id).set(
      {
        todo: input,
      },
      { merge: true }
    );

    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
          <h1>I am modal</h1>
          <input
            placeholder={props.text.todo}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={updateTodo}>Update Todo</Button>
        </div>
      </Modal>

      <List className="todo__list">
        <ListItem>
          <ListItemAvatar></ListItemAvatar>
          <ListItemText primary="Todo" secondary={props.text.todo} />
        </ListItem>
        <button onClick={(e) => setOpen(true)}>Edit</button>
        <DeleteForeverIcon
          onClick={(e) => {
            db.collection("todos").doc(props.text.id).delete();
          }}
        />
        <Button
          color="secondary"
          onClick={(e) => {
            db.collection("todos").doc(props.text.id).delete();
          }}
        >
          DELETE ME
        </Button>
      </List>
    </>
  );
};

export default Todo;
