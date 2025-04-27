import { EnvelopeSimple, GithubLogo, LinkedinLogo } from '@phosphor-icons/react/dist/ssr';

export default function Footer() {
  const email = 'oleksandr.zwick@gmail.com';

  return (
    <footer className="flex items-center justify-center my-8 mx-2 text-base/6 text-zinc-400">
      <div className="mx-auto max-w-6xl">
        <div className="flex justify-center space-x-6">
          <a
            href="https://linkedin.com/in/oleksandr-tsvik"
            className="text-zinc-400 hover:text-zinc-500"
            target="_blank"
          >
            <span className="sr-only">Linkedin</span>
            <LinkedinLogo size={24} />
          </a>
          <a href="https://github.com/OleksandrTsvik" className="hover:text-zinc-500" target="_blank">
            <span className="sr-only">Github</span>
            <GithubLogo size={24} />
          </a>
          <a href={`mailto:${email}`} className="hover:text-zinc-500">
            <span className="sr-only">Gmail</span>
            <EnvelopeSimple size={24} />
          </a>
        </div>
        <p className="mt-4">
          ©&nbsp;2025.&nbsp;Copyright:&nbsp;
          <a href={`mailto:${email}`} className="hover:text-zinc-500 hover:underline">
            {email}
          </a>
        </p>
      </div>
    </footer>
  );
}
