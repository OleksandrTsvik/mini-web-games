import { EnvelopeSimple, GithubLogo, LinkedinLogo } from '@phosphor-icons/react/dist/ssr';

import { SocialLink } from './social.link';

export function Footer() {
  const email = 'oleksandr.zwick@gmail.com';

  return (
    <footer className="flex items-center justify-center my-8 mx-2 text-base/6 text-zinc-500">
      <div className="mx-auto max-w-6xl">
        <div className="flex justify-center space-x-6">
          <SocialLink
            href="https://linkedin.com/in/oleksandr-tsvik"
            icon={<LinkedinLogo size={24} />}
            screenReader="Linkedin"
          />
          <SocialLink
            href="https://github.com/OleksandrTsvik/mini-web-games"
            icon={<GithubLogo size={24} />}
            screenReader="Github"
          />
          <SocialLink
            href={`mailto:${email}`}
            icon={<EnvelopeSimple size={24} />}
            screenReader="Gmail"
          />
        </div>
        <p className="mt-4">
          ©&nbsp;2025.&nbsp;Copyright:&nbsp;
          <a
            href={`mailto:${email}`}
            className="hover:text-zinc-700 hover:underline break-all"
          >
            {email}
          </a>
        </p>
      </div>
    </footer>
  );
}
