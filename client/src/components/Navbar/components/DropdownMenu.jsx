import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PropType from "prop-types";
import Typography from '@mui/material/Typography';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";

import classes from "./style.module.scss";
import { setLogin, setToken, setUserData } from "@containers/Client/actions";

function DropDownMenu({ isOpen, anchorEl, onClose, labeledMenu }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    function menuItemAction(id) {
        switch (id) {
            case 0:
                navigate("/profile");
                onClose();
                break;
            case 1:
                navigate("/newjourney");
                onClose();
                break;
            case 2:
                navigate("/bookmark");
                onClose();
                break;
            case 3:
                // navigate("/newjourney");
                dispatch(setLogin(false));
                dispatch(setUserData(null));
                dispatch(setToken(null));
                onClose();
                break;
        }
    }

    return (
        <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={isOpen}
            onClose={onClose}
            MenuListProps={{
                'aria-labelledby': labeledMenu,
            }}
        >
            <MenuItem onClick={() => menuItemAction(0)}>
                <Person2OutlinedIcon className={classes.iconProfile} />
                <Typography variant="body2"><FormattedMessage id="nav_profile" /></Typography>
            </MenuItem>
            <div className={classes.divider}></div>
            <MenuItem onClick={() => menuItemAction(3)}>
                <LogoutIcon className={classes.iconLogout} />
                <Typography variant="body2"><FormattedMessage id="nav_logout" /></Typography>
            </MenuItem>
        </Menu>
    );
}

DropDownMenu.propType = {
    isOpen: PropType.bool.isRequired,
    onClose: PropType.func.isRequired,
    labeledMenu: PropType.string.isRequired,
    anchorEl: PropType.element.isRequired,
}

export default DropDownMenu;