// Importing styles and components
import "../styles/About/about.style.scss"
import { GoogleMapComponent } from "../components/GoogleMaps"

// About component
export const About = () => {

    // Render the About page
    return(
        <div className="full-about-page">
            {/* Section 1 with text content */}
            <div className="about-page1">
                <div className="about-wrapper">
                    <div className="about-inner-wrapper">
                        <h1>om oss</h1>
                        <p>
                        {/* About us content */}
                        Välkommen till Emils Gitarr Butik – ditt hem för passionerade gitarrister och musikälskare i hjärtat av Stockholm. <br /> Sedan vår öppning år 2023 har vi försett musikentusiaster med kvalitativa gitarrer och tillbehör, och vår dedikation till att erbjuda den bästa musikupplevelsen har gjort oss till en av stadens främsta gitarrdestinationer.
                        Emils Gitarr Butik grundades av passionerade musiker med ett gemensamt mål – att skapa en plats där både nybörjare och erfarna gitarrister kan hitta det de behöver för att fördjupa sin kärlek till musik. Vårt engagemang för kvalitet genomsyrar allt vi gör, från vårt noggrant kuraterade sortiment av gitarrer och tillbehör till vår personliga och kunniga service.
                        Vi förstår att varje gitarrist har sin egen unika stil och smak. Därför strävar vi efter att erbjuda ett brett utbud av gitarrer från olika märken och modeller, så att du kan hitta den som passar just dig. Vårt kunniga team av musikentusiaster finns alltid här för att ge råd och vägledning, oavsett om du är på jakt efter din första gitarr eller letar efter nästa tillskott till din samling.
                        Utöver att erbjuda ett omfattande utbud av gitarrer och tillbehör, värnar vi om att skapa en inspirerande atmosfär där musikälskare kan samlas och dela sina passioner. Vi anordnar regelbundet evenemang, workshops och jam sessions för att skapa en gemenskap av likasinnade individer som delar vår kärlek till gitarrmusik.
                        Vi är stolta över att vara en del av Stockholms musikscen och ser fram emot att fortsätta växa och utvecklas med våra kunder. Oavsett om du är en nybörjare som precis börjat utforska musikens värld eller en erfaren gitarrist som söker det perfekta instrumentet, är Emils Gitarr Butik platsen där dina musikaliska drömmar blir verklighet. Kom och upplev skillnaden hos oss – där varje ackord ringer med kvalitet och passion.</p>
                    </div>
                </div>

            </div>

            {/* Section 2 with contact information and map */}
            <div className="about-page-2">
                <div className="about-wrapper-2">
                    <div className="about-inner-wrapper-2">
                        {/* Wrapper for contact information */}
                        <div className="info-wrapper">
                        <p>
                            {/* Contact information */}
                            Ni hittar oss på Birkagatan 2 i Stockholm <br />
                            <br />
                            Våra öppetider varigerar så ring innan tack
                        </p>
                        <p>
                            mail: emil@test.com <br />
                            <br />
                            Mobil: 070-133 74 20 <br />
                            <br />
                            Adress: Birkagatan 2
                        </p>
                        </div>
                        {/* GoogleMapComponent displaying the location */}
                        <GoogleMapComponent address="Birkagatan 2, Stockholm"/>
                    </div>
                </div>
            </div>
        </div>
    )
}