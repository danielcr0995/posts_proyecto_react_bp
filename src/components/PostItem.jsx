import React from "react";
import Button from "react-bootstrap/Button";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Stack from "react-bootstrap/Stack";
import { useNavigate } from "react-router-dom";

function PostItem(props) {
  const navigate = useNavigate();
  const { id, title, body, onDelete, onEdit, onViewComments } = props;

  return (
    <tr>
      <td>{title}</td>
      <td>{body}</td>
      <td>
        <Stack direction="horizontal" gap={3}>
          <Button
            variant="outline-primary"
            onClick={() => navigate(`/posts/${id}`)}
          >
            View
          </Button>
          <Button variant="outline-primary" onClick={() => onViewComments(id)}>
            Comments
          </Button>
          <Button variant="outline-secondary" onClick={() => onEdit(id)}>
            <ModeEditOutlinedIcon />
          </Button>
          <Button variant="outline-danger" onClick={() => onDelete(id)}>
            <DeleteOutlineOutlinedIcon />
          </Button>
        </Stack>
      </td>
    </tr>
  );
}

export default PostItem;
