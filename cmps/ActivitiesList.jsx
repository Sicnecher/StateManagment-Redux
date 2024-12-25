const { useState, useEffect } = React;

export function ActivitiesList({ activities }) {
  const currentTime = Date.now();

  function calcTime(time) {
    const diff = currentTime - time;
    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return hours > 1
      ? "Couple of hours ago"
      : hours === 1
      ? "An hour ago"
      : minutes > 1
      ? `${minutes} minutes ago`
      : minutes === 1
      ? "A minute ago"
      : seconds > 1 && `${seconds} seconds ago`;
  }

  return (
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
            const timeString = calcTime(activity.time);
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
  );
}
