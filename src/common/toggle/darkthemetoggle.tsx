import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {toggleDarkTheme} from "../../store/actions";
import {faCloudMoon} from "@fortawesome/free-solid-svg-icons/faCloudMoon";
import {faSun} from "@fortawesome/free-regular-svg-icons/faSun";
import {faCloudSun} from "@fortawesome/free-solid-svg-icons/faCloudSun";


const DarkThemeToggle = () => {
    const darkThemeEnabled = useSelector((state: any) => state.preferences.darkThemeEnabled);
    const dispatch = useDispatch();
// <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{darkThemeEnabled ? 'Dark' : 'Default'}</label>
    return (
        <>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" checked={darkThemeEnabled} onChange={() => dispatch(toggleDarkTheme())} />
                <FontAwesomeIcon icon={darkThemeEnabled ? faCloudMoon : faCloudSun} />
            </div>
        </>
    );
};

export default DarkThemeToggle;
