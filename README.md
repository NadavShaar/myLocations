# myLocations
> An interview test project.

### Highlights
- themed
- Material-ui's components are wrapped to ease future upgrades
- Custom webpack + babel project setup and configs
- Global components handling using custom events (Snackbar + Confirm)
- Custom reusable ui elements
- Extendable routing system
- Saving data in local-storage using redux middleware
- Mobile friendly
- Saving locations with zoom

And much more...

**[Requirements](#Requirements)**

**Live demo [here](https://nadavshaar.github.io/myLocations/)** 

**Note:** Github pages doesn't support client routing like react router therefor when refreshing the page you'll get a 404.

![myLocations](https://user-images.githubusercontent.com/8030614/96838793-fd078600-1450-11eb-81ef-c1ae0e8a520a.gif)

![Categories](https://user-images.githubusercontent.com/8030614/95834903-3d2a8280-0d46-11eb-9ce7-e59273638a4c.gif)


## Requirements

The sample application is called myLocations. It allows the user to maintain a list of categorized
name locations.
The domain model has two main entities: Category and Location.
Category has a single property: name. 
Location has the following properties: name, address, coordinates, and category.
All properties of the entities are required.
All data is saved to the local storage of the browser.

**Step-1: CRUD application to manage the category entity**
- The user can view a list of all existing categories.
- When the user chooses a category from the list, it is highlighted, and he can click any of
the actions in the toolbar to manage the category - edit, view details, delete.
- There is a permanent toolbar at the top, for all screens. It contains a title and actions. The
title and actions update according to context. For example, when the user is in the
“category list” or “new category” screens there is no specific category in the context so it
doesn’t make sense to make the “edit” / “delete” actions available. The title in this case
can be “Categories” and the only available action is “new category”. If there is a category
in context the available actions would be “edit”, “delete”, “view”.
- The user can create a new category (this action is also in the toolbar).

**Step-2: the rest of the application**
- There is a permanent bar at the bottom, that contains 2 buttons - categories and locations.
By clicking the button he moves between the management screens of each entity.
- The user can manage locations, following the previous UX.
- The locations list can be sorted alphabetically.
- The locations list can be grouped by category.
- The locations list can be filtered by category.
- When defining a location the user must choose an existing category from a list.
- A single location can be viewed on map (choose any map lib you like).

**Bonus**
- Allow selecting the coordinates from a map and not entering by hand.
- Allow relating multiple categories to a single item, define and enhance the use cases and
ui related to this.

**Remember the important things:**
- Code quality
- Solution correctness and bug free
- UI &amp; UX

Generally, we expect to see a production-ready system.
Give us your best!
