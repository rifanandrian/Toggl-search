import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player/lazy";

import { useResultContext } from "../context/ResultContextProvider";
import { Loading } from "./Loading";

export const Results = () => {
  const { results, loading, getResults, searchTerm } = useResultContext();
  const location = useLocation();

  useEffect(() => {
    if (searchTerm) {
      if (location.pathname === "/videos") {
        getResults(`/search/q=${searchTerm} videos`);
      } else {
        getResults(`${location.pathname}/q=${searchTerm}`);
      }
    }
  }, [searchTerm, location.pathname]);

  if (loading) {
    return <Loading />;
  }

  switch (location.pathname) {
    case "/search":
      return (
        <div className="flex flex-col justify-between space-y-6 sm:px-56 w-full">
          {results?.map(({ link, title }, index) => (
            <div key={index} className="md:w-2/5 w-full">
              <a href={link} target="_blank" rel="noreferrer">
                <p className="text-sm">
                  {link.length > 30 ? link?.toString().substring(0, 30) : link}
                </p>
                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                  {title}
                </p>
              </a>
            </div>
          ))}
        </div>
      );
    case "/images":
      return (
        <div className="flex flex-wrap justify-center items-center">
          {results?.map(({ image, link: { href, title } }, index) => (
            <a
              className="sm:p-3 p-5"
              href={href}
              key={index}
              target="_blank"
              rel="noreferrer"
            >
              <img
                className="2-full"
                src={image?.src}
                alt={title}
                loading="lazy"
              />
              <p className="w-36 break-word text-sm mt-2">{title}</p>
            </a>
          ))}
        </div>
      );
    case "/news":
      return (
        <div className="sm:px-56 flex flex-col justify-start items-center space-y-6">
          {results?.map(({ id, links, source, title, published }) => (
            <div className="w-full" key={id}>
              <div className="flex justify-between">
                <a
                  href={source?.href}
                  target="_blank"
                  rel="noreferrer"
                  className="gap-4 hover:underline hover:text-blue-300"
                >
                  {source?.href}
                </a>
                <p className="text-xs text-slate-700/25">{published}</p>
              </div>
              <a
                href={links?.[0].href}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                <p className="text-lg dark:text-blue-300 text-blue-700">
                  {title}
                </p>
              </a>
            </div>
          ))}
        </div>
      );
    case "/videos":
      return (
        <div className="flex flex-col justify-start items-start">
          {console.log(results)}
          {results?.map((video, index) => (
            <div className="flex p-2" key={index}>
              <div className="">
                <ReactPlayer
                  url={video.additional_links?.[0].href}
                  controls
                  width="355px"
                  height="200px"
                />
              </div>
              <div className="pl-4">
                <a href={video.link} className="text-sm pb-4">
                  {video.title}
                </a>
                <div className="text-sm">{video.description}</div>
              </div>
            </div>
          ))}
        </div>
      );
    default:
      return "ERROR!!";
  }
};
