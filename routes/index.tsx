import { Handlers, PageProps } from '$fresh/server.ts';

export const handler: Handlers = {
  async GET(req, ctx) {
    const url = new URL(req.url);
    const username = url.searchParams.get('username');
    const request = await fetch(`https://api.github.com/users/${username}`);
    console.log('🚀 ~ file: index.tsx:9 ~ GET ~ request:', request);
    if (!request.ok) {
      return ctx.render(null);
    }
    const user = await request.json();
    return ctx.render({ user });
  },
};

export default function Home({ data }: PageProps) {
  console.log('🚀 ~ file: index.tsx:18 ~ Home ~ data:', data);

  const user = data?.user;
  return (
    <main className='h-screen bg-[#040F1A] w-screen flex flex-col items-center justify-center text-white'>
      {data && (
        <div className='bg-[#0B1B2B] flex gap-5 py-12 px-8 rounded-lg mb-12 shadow-xl border-[1px] relative'>
          <img
            src={data.user.avatar_url}
            alt='Foto do usuário Github'
            className='max-w-[148px] rounded-md'
          />
          <a href={user.url} target='_blank' className='absolute top-5 right-5'>
            GITHUB
          </a>
          <div>
            <p className='font-bold text-lg'>{data.user.name}</p>
            <p>{data.user.bio}</p>
            <div>Localização: {data.user.location}</div>
            <div>Repositórios públicos: {data.user.public_repos}</div>
            {/* <div>
              <a href={`/repos/${user.login}`}>
                <button className='font-bold px-10 py-3 bg-blue-600'>
                  VER REPOSITÓRIOS
                </button>
              </a>
            </div> */}
          </div>
        </div>
      )}
      <form className='bg-[#0B1B2B] rounded-lg px-16 py-12'>
        <h1 className='text-3xl font-black mb-24'>
          ENCONTRE SEU USUÁRIO GIT HUB
        </h1>
        <label className='text-lg font-bold block mb-12'>
          Usuário:
          <input
            type='text'
            name='username'
            className='ml-2 border-2 bg-transparent'
          />
        </label>
        <button className='bg-blue-500 rounded-full px-10 py-4 font-black text-white'>
          Pesquisar
        </button>
      </form>
    </main>
  );
}
