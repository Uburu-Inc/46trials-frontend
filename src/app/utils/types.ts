export interface NextServerSideSearchParameterTypes {
  params: { slug: string, id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}
