import blue from "@material-ui/core/colors/blue";
import lightBlue from "@material-ui/core/colors/lightBlue";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import lightGreen from "@material-ui/core/colors/lightGreen";
import purple from "@material-ui/core/colors/purple";
import deepPurple from "@material-ui/core/colors/deepPurple";
import grey from "@material-ui/core/colors/grey";

const ThemeSelector = (index) => {
    switch (index) {
        default:
            return blue;
        case 1:
            return lightBlue;
        case 2:
            return red;
        case 3:
            return green;
        case 4:
            return lightGreen;
        case 5:
            return purple;
        case 6:
            return deepPurple;
        case 7:
            return grey;
    }
};

export default ThemeSelector;
