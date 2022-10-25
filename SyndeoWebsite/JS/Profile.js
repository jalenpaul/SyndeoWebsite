import { ProfileModel } from '../JS/Models/ProfileModel';

//TODO load profile model
var profileModel = new ProfileModel(null);


const layout = (
    <div>
        <header id="header_profile">
            <h1 id="h1_profile_username">{profileModel.userModel.username}</h1>
        </header>
        <article id="article_profile">
            <section>
                <img id="img_profile_display" src={profileModel.userModel.pfpURL}/>
            </section>

            <section id="section_profile_mainInfo">
                <p id="p_profile_bio">
                    <img id="img_profile_pfp" src={profileModel.userModel.pfpURL} />
                    <h2 id="h2_profile_realName">{profileModel.fullName} {profileModel.pronouns}</h2>
                    {profileModel.bio}
                </p>
                <h3 id="h3_profile_lookingFor">Looking For:</h3>
            </section>
        </article>
    </div>
);

const domContainer = document.querySelector('#body_profile');
const root = ReactDOM.createRoot(domContainer);
root.render(layout);