import React, { useState } from 'react';
import { NavItem, NavLink, Tooltip } from 'reactstrap';
const Tab = ({ path, title, link, description, index }) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  return (
    <>
      <NavItem  id={`tooltip_${index}`}>
        {path? path === link?
          <NavLink active href={link} style={{backgroundColor: '#FF5733'}}>
            {title}
          </NavLink>
        :
          <NavLink href={link} style={{color: '#000000'}}>
            {title}
          </NavLink>
        :<></>}
      </NavItem>
      <Tooltip
        placement='bottom'
        autohide={false}
        isOpen={tooltipOpen}
        target={`tooltip_${index}`}
        toggle={() => setTooltipOpen(!tooltipOpen)}
      >
        <b>{ description? description :''}</b>
      </Tooltip>
    </>
  );
}

export default Tab;