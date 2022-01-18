import { Drawer, Toolbar, List, ListItem, ListItemText } from "@mui/material";
import { Box } from "@mui/system";

const drawerWidth = 240;

const SideMenu = function (props) {
  return (
    <Drawer
      anchor="left"
      open={props.open}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default SideMenu;
