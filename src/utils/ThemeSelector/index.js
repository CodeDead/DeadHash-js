import blue from "@material-ui/core/colors/blue";
import lightBlue from "@material-ui/core/colors/lightBlue";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import lightGreen from "@material-ui/core/colors/lightGreen";
import purple from "@material-ui/core/colors/purple";
import deepPurple from "@material-ui/core/colors/deepPurple";
import grey from "@material-ui/core/colors/grey";

export const ThemeSelector = (index) => {
    let primary;
    switch (index) {
        default:
            primary = blue;
            break;
        case 1:
            primary = lightBlue;
            break;
        case 2:
            primary = red;
            break;
        case 3:
            primary = green;
            break;
        case 4:
            primary = lightGreen;
            break;
        case 5:
            primary = purple;
            break;
        case 6:
            primary = deepPurple;
            break;
        case 7:
            primary = grey;
            break;
    }

    return primary;
};
