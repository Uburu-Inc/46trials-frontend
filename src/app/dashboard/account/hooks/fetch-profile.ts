// import { useEffect, useState, useRef } from "react";
// import { useNetworkRequest } from "@/lib/axios";
// import { routes } from "../../../hooks/routes";

// export function useFetchInstitution(): FetchInstitutionFuncProps {
//   const [institutions, setInstitutions] =
//     useState<FetchInstitutionProps | null>(null);

//   const [success, setSuccess] = useState(false);
//   const { axios, loading } = useNetworkRequest();
//   const isRequestMade = useRef(false); 

//   useEffect(() => {
//     // Caches the first request with the use of "ref"
//     if (isRequestMade.current) return;
//     isRequestMade.current = true;

//     async function getInstitutions() {
//       try {
//         const res = await axios.get(routes.FETCH_INSTITUTIONS);
//         if (res.data) setInstitutions(res.data);
//         setSuccess(true);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     getInstitutions();
//   }, [axios]);

//   return { loading, success, institutions };
// }
