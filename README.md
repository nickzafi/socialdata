### Social data analysis 2017

The current repository was created for the Social data analysis and visualization course offered by DTU. With the help of d3.js visualazation tool.

### One scatter plot and two datasets

The goal of the first part of our task was to visualize San Francisco's crime data from 2003 and 2015 reagarding the areas and the type of crime occured. Each circle corresponds to a specific crime category while the radious of the circle is proportional to the number of the total crimes. Use the toggle button to switch between 2003-2015.
  
### Visualizing geodata

On the next step we explore K-means clustering. The overall idea is that each value of K has an associated view, where each of the K centroids is shown as a large colored dot, and all GPS points belonging to that centroid are colored accordingly. With the assigned buttons you can toggle among the K values. You can also hover above each button to preview the result.

### Technical details
The index page loads 2 javascript files. One for each diagram/exercise.
For the first one, data are load from a csv file. Everytime you toggle data are not reloaded, rather different parts are selected.
For the second we load the data for the map from a json. The data for the points as well as to what cluster they belong are loaded
in a csv. Lastly, the centroids are hard coded to a list of lists due to the small number. Loading a new csv would take
far more time while having this kind of data to our previous csv would vastly enlarge it. 

### Tools Needed
In the repo the ipython notebook where the data manipulation took place as well as the scripts used for the final page could be found. 

### Visit our page
https://nickzafi.github.io/socialdata/
