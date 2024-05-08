
const profile = {
    backgroundImage:
        'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',

}

export default function DashboardHero() {
    return (
        <div>
            <div>
                <img className="h-32 w-full object-cover lg:h-48" src={profile.backgroundImage} alt="" />
            </div>
        </div>
    )
}
