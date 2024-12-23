const { useState, useEffect } = React;

export function ActivitiesList({ activities }) {
  const [timeString, setTimeString] = useState(null);

  useEffect(() => {
    const time = new Date(activities.time);
    setTimeString(time.toDateString());
  }, []);
  return (
    timeString && (
      <section>
        <h2>User Activities List</h2>
        <table className="activities-list">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, idx) => {
              return (
                <tr key={idx}>
                  <td>{activity.title}</td>
                  <td>{activity.description}</td>
                  <td>{timeString}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    )
  );
}
