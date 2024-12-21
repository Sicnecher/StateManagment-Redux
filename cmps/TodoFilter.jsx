import { SET_FILTER_BY } from "../store/reducers/todo.reducer.js";

const { useDispatch, useSelector } = ReactRedux;
const { useState, useEffect } = React;

export function TodoFilter() {
  const dispatch = useDispatch();

  const filterBy = useSelector((state) => state.todoModule.filterBy);
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy });

  useEffect(() => {
    // Notify parent
    dispatch({ type: SET_FILTER_BY, filterBy: filterByToEdit });
  }, [filterByToEdit]);

  function handleChange({ target }) {
    const field = target.name;
    let value = target.value;

    switch (target.type) {
      case "number":
      case "range":
        value = +value || "";
        break;

      case "checkbox":
        value = target.checked;
        break;

      default:
        break;
    }
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
  }

  // Optional support for LAZY Filtering with a button
  function onSubmitFilter(ev) {
    ev.preventDefault();
    dispatch({ type: SET_FILTER_BY, filterBy: filterByToEdit });
  }

  const { txt, importance, isDone } = filterByToEdit;
  return (
    <section className="todo-filter">
      <h2>Filter Todos</h2>
      <form onSubmit={onSubmitFilter}>
        <input
          value={txt}
          onChange={handleChange}
          type="search"
          placeholder="By Txt"
          id="txt"
          name="txt"
        />
        <input
          value={importance}
          onChange={handleChange}
          type="number"
          placeholder="By Importance"
          id="importance"
          name="importance"
        />
        <select
          id="dropdown"
          name="isDone"
          value={isDone}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select an option
          </option>
          <option value="all">All</option>
          <option value={false}>Active</option>
          <option value={true}>Done</option>
        </select>
        <button hidden>Set Filter</button>
      </form>
    </section>
  );
}
