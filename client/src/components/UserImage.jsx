import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
  reutrn(
    <Box width={size} height={size}>
      <img
        style={{ objectFit: "cover", bordeRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`http://localhost:9001/assets/${image}`}
      />
    </Box>
  );
};

export default UserImage;
