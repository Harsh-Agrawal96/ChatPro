
import { Menu } from '@mui/material'
import React from 'react'


const FileMenu = ({ anchorE1 }) => {
  return (
    <Menu anchorEl={anchorE1} >
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