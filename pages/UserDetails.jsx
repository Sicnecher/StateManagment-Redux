import { ActivitiesList } from "../cmps/ActivitiesList.jsx";
import { userService } from "../services/user.service.js";
import { stateUserActions } from "../store/actions/user.actions.js";
const { useState, useEffect } = React;
const { useParams } = ReactRouterDOM;

export function UserDetails() {
  const params = useParams();
  const [user, setUser] = useState({});
  useEffect(() => {
    userService
      .getById(params.userId)
      .then((user) => {
        setUser(user);
        setUserToEdit(user);
      })
      .catch((err) => {
        console.log("User not found", err);
      })
      .finally(() => {
        console.log("User:", user);
      });
  }, []);

  function handleChange({ target }) {
    const field = target.name;
    let value = target.value;
    
    // set user to edit
    setUser((prevUser) => ({ ...prevUser, [field]: value }));
    stateUserActions.updateUser({ ...user, [field]: value });
  }

  const { fullname, username, color, bgColor, activities } = user || {};
  return (
    user._id && (
      <section className="user-details">
        <h1>Hello there {fullname}!</h1>
        <h3>Sorry we meant {username}...</h3>
        <h2>This is your data</h2>
        <form className="user-details-form" onChange={handleChange}>
          <h2>Details:</h2>
          <label htmlFor="username">Name:</label>
          <input type="text" id="username" name="username" value={username} />
          <label htmlFor="email">Color:</label>
          <input type="color" id="color" name="color" value={color} />
          <label htmlFor="birthDate">BGColor:</label>
          <input type="color" id="bgColor" name="bgColor" value={bgColor} />
        </form>
        <ActivitiesList activities={activities} />
      </section>
    )
  );
}
