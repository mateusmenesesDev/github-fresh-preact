import { Handlers, PageProps } from '$fresh/server.ts';

export const handler: Handlers = {
  async GET(_, ctx) {
    const { name } = ctx.params;
    const urlRequest = `https://api.github.com/users/${name}/repos`;
    const request = await fetch(urlRequest);
    // console.log('🚀 ~ file: [name].tsx:8 ~ GET ~ request:', request);
    if (!request.ok) {
      return ctx.render();
    }
    const repos = await request.json();
    return ctx.render(repos);
  },
};
export default function Repos({ params, data }: PageProps) {
  if (!data) {
    return (
      <div className='bg-[#040F1A] h-screen text-white flex justify-center items-center'>
        <h1 className='text-4xl font-black'>
          Repositórios não encontrados | API atingiu o limite :/
        </h1>
      </div>
    );
  }
  return (
    <div className='bg-[#040F1A] h-screen text-white p-14'>
      <h1 className='font-bold text-3xl mb-14'>
        REPOSITÓRIOS - <span className='uppercase'>{params.name}</span>
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {data?.map((repo: any) => (
          <div className='max-w-xs bg-[#0B1B2B] rounded overflow-hidden shadow-lg'>
            <img
              className='w-full'
              src='caminho_para_a_imagem_do_repositorio'
              alt='Imagem do Repositorio'
            />
            <div className='px-6 py-4'>
              <div className='font-bold text-xl mb-2'>{repo.name}</div>
              <p className='text-gray-700 text-base'>
                Descricao do Repositorio
              </p>
            </div>
            <div className='px-6 py-4'>
              <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2'>
                #Tag1
              </span>
              <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700'>
                #Tag2
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
