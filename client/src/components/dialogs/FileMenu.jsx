import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { 
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Tooltip
} from "@mui/material";
import {
  AudioFile as AudioFileIcon,
  Image as ImageIcon,
  UploadFile as UploadFileIcon,
  VideoFile as VideoFileIcon,
} from "@mui/icons-material";
import { setIsFileMenu, setUploadingLoader } from "../../redux/reducers/misc";
import toast from "react-hot-toast";


const FileMenu = ({ anchorE1 }) => {
  const { isFileMenu } = useSelector((state) => state.misc);

  return (
    <Menu anchorEl={anchorE1} open={isFileMenu} >
        <div
          style={{ 
            width: "7rem",
          }}
        >
            Loratis molestias dolor!
        </div>
    </Menu>
  )
}

export default FileMenu