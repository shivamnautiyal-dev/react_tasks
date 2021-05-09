import React from "react";
import type { FC } from "react";
import {
  Grid,
  Box,
  Typography,
  IconButton,
  Card,
  makeStyles,
  ListItem,
  List,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
} from "@material-ui/core";
import clsx from "clsx";
import { ExpandMore, Send } from "@material-ui/icons";
import { recentActivities } from "./recentactivities.mock";

export interface RecentActivitiesProps {
  [key: string]: any;
  className?: string;
}
const useStyles = makeStyles((theme) => ({
  card: {
    //padding: "20px 16px",
  },
  header: {
    padding: "16px 0px",
  },
  listBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 0px",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  divider: {
    marginTop: 16,
  },
}));

const RecentActivities: FC<RecentActivitiesProps> = ({
  className,
  ...rest
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.card}>
      <Typography variant="h4" className={classes.header}>
        Recent Activities
      </Typography>
      <Divider />
      {recentActivities.map((item, index) => (
        <List
          key={index}
          subheader={
            <>
              <Box className={classes.listBox}>
                <Typography variant="body1">{item.date}</Typography>

                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                >
                  <ExpandMore />
                </IconButton>
              </Box>
              <Divider />
            </>
          }
        >
          <Collapse in={expanded}>
            {item.activities.map((data, index) => (
              <>
                <ListItem key={index}>
                  <ListItemIcon>
                    <Send />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="caption">
                        {data.name} - {data.time}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body1">{data.message}</Typography>
                    }
                  />
                </ListItem>
                <Divider />
              </>
            ))}
          </Collapse>
        </List>
      ))}
    </Card>
  );
};

export default RecentActivities;
