import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsers } from "../state"; // Import the Redux action
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material";

const fetchUsers = async (dispatch, token) => {
  try {
    const response = await fetch("http://localhost:9001/users", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setUsers({ users: data })); // Store in Redux
  } catch (err) {
    console.error("Error fetching users:", err);
  }
};

const UserList = ({ users = [] }) => {
  const navigate = useNavigate();
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  //const users = useSelector((state) => state.users);

  useEffect(() => {
    if (token) fetchUsers(dispatch, token);
  }, [dispatch, token]);

  return (
    <div style={{ overflowY: "auto" }}>
      <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
        {users.map((user) => (
          <li
            key={user._id}
            onClick={() => {
              navigate(`/profile/${user._id}`);
              window.location.reload();
            }}
          >
            <Typography
              padding="0.5rem"
              sx={{
                "&:hover": {
                  //color: palette.primary.light,
                  backgroundColor: palette.primary.light,
                  cursor: "pointer",
                },
              }}
            >
              {user.firstName} {user.lastName}
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
