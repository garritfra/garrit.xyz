import Link from "next/link";

export default function Profile(props) {
  return (
    <div className="profile">
      <h2>Garrit Franke</h2>
      <p>Random thoughts, tips and rants about software</p>
      <br />
      <Link href="https://garrit.xyz">Website</Link>
      <br />
      <Link href="https://github.com/garritfra">Github</Link>
      <br />
      <Link href="https://www.linkedin.com/in/garritfranke/">LinkedIn</Link>
      <br />
      <Link href="mailto:garrit@slashdev.space">
      Email
      </Link>
      <br />
      <Link href="https://matrix.to/#/@garrit:matrix.slashdev.space">
      Matrix
      </Link>
      <br />
      <Link href="https://keyoxide.org/hkp/garrit@slashdev.space">
      PGP
      </Link>
      <br />
      <Link href="/rss.xml">RSS</Link>
      <style jsx>
        {`
          img {
            width: 12rem;
          }

          Link {
            margin: 1rem;
          }

          @media (max-width: 767px) {
            .profile {
              padding: 1.5rem 1.25rem;
            }
          }
        `}
      </style>
    </div>
  );
}
