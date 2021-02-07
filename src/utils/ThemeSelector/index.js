import blue from '@material-ui/core/colors/blue';
import lightBlue from '@material-ui/core/colors/lightBlue';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import lightGreen from '@material-ui/core/colors/lightGreen';
import purple from '@material-ui/core/colors/purple';
import deepPurple from '@material-ui/core/colors/deepPurple';
import grey from '@material-ui/core/colors/grey';
import orange from '@material-ui/core/colors/orange';
import deepOrange from '@material-ui/core/colors/deepOrange';
import amber from '@material-ui/core/colors/amber';
import brown from '@material-ui/core/colors/brown';

/**
 * Select the theme, depending on the theme index
 * @param index The theme index
 * @returns The required color scheme
 * @constructor
 */
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
    case 8:
      return orange;
    case 9:
      return deepOrange;
    case 10:
      return amber;
    case 11:
      return brown;
  }
};

export default ThemeSelector;
