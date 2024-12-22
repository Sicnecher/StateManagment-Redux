const { useState, useEffect } = React;

export function ActivitiesList({activities}){
    const [timeString, setTimeString] = useState(null);

    useEffect(() => {
        const time = new Date(activities.time);
        setTimeString(time.toDateString());
        console.log('timeString:', time.toDateString());
        console.log(activities)
    }, [])
    return (
        timeString &&
        <section>
            {/* <h2>User Activities List</h2>
            {
                activities.map(activity => {
                    return (
                        <div key={activity.id}>
                            <h4>{activity.title}</h4>
                            <h4>{activity.description}</h4>
                            <p>{activity.time}</p>
                        </div>
                    )
                })
            } */}
        </section>
    )
}