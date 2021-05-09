import React, { useState } from "react";
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
import {
  CheckCircle,
  LocationOn,
  Today,
  DeleteForever,
  People,
  Flag,
  ExpandMore,
  ExpandLess,
} from "@material-ui/icons";
import { recentActivity } from "./recentactivity.mock";
import FilePlus from "./assets/FilePlusIcon";

export interface RecentActivityProps {
  [key: string]: any;
  className?: string;
}
const useStyles = makeStyles((theme) => ({
  header: {
    padding: "16px 20px",
  },
  listBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0px 16px",
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
  listItemIcon: {
    marginTop: "-10px",
    paddingRight: "14px",
    display: "flex",
    minWidth: 0,
  },
}));

const RecentActivity: FC<RecentActivityProps> = ({ className, ...rest }) => {
  const classes = useStyles();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  console.log(recentActivity);
  return (
    <Card>
      <Typography variant="h4" className={classes.header}>
        Recent Activities
      </Typography>
      <Divider />
      {recentActivity?.map((item, index) => (
        <List
          key={index}
          subheader={
            <>
              <Box className={classes.listBox}>
                <Typography variant="body1">{item.date}</Typography>
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: null,
                  })}
                  onClick={(event) => {
                    setActiveIndex(activeIndex === index ? null : index);
                  }}
                >
                  {activeIndex === index ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </Box>
              <Divider />
            </>
          }
        >
          <Collapse in={activeIndex === index}>
            {item.activity.map((data, index) => (
              <>
                <ListItem key={index}>
                  <ListItemIcon className={classes.listItemIcon}>
                    {data?.activityType === "Uploaded" && <FilePlus />}
                    {data?.activityType === "Approved" && (
                      <CheckCircle style={{ color: "#4CAF50" }} />
                    )}
                    {data?.activityType === "AddedNewSite" && (
                      <Flag style={{ color: "#333333" }} />
                    )}
                    {data?.activityType === "Location" && (
                      <LocationOn style={{ color: "#2F80ED" }} />
                    )}
                    {data?.activityType === "Deleted" && (
                      <DeleteForever style={{ color: "##B71C1C" }} />
                    )}
                    {data?.activityType === "AddedContributor" && (
                      <People style={{ color: "#2196F3" }} />
                    )}
                    {data?.activityType === "NewSchedule" && (
                      <Today style={{ color: "#9B51E0" }} />
                    )}
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

export default RecentActivity;
