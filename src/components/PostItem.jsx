import React from "react";
import Button from "react-bootstrap/Button";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Stack from "react-bootstrap/Stack";
import { useNavigate } from "react-router-dom";

function PostItem(props) {
  const navigate = useNavigate();
  const { post, onDelete, onEdit, onViewComments } = props;

  return (
    <tr>
      <td>{post.title}</td>
      <td>{post.body}</td>
      <td>
        <Stack direction="horizontal" gap={3}>
          <Button
            variant="outline-primary"
            onClick={() => navigate(`/posts/${post.id}`)}
          >
            View
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => onViewComments(post.id)}
          >
            Comments
          </Button>
          <Button variant="outline-secondary" onClick={() => onEdit(post)}>
            <ModeEditOutlinedIcon />
          </Button>
          <Button variant="outline-danger" onClick={() => onDelete(post.id)}>
            <DeleteOutlineOutlinedIcon />
          </Button>
        </Stack>
      </td>
    </tr>
  );
}

export default PostItem;
