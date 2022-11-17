import React, { ChangeEvent, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { Users } from "./interfaces/users.interface";
import { Album } from "./interfaces/album.interface";
import { Photos } from "./interfaces/photos.interface";
import { Tab } from "@headlessui/react";
import "./index.css";
import Pages from "../Pages";

const Dashboard = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [albumsFiltered, setAlbumsFiltered] = useState<Album[]>([]);
  const [photos, setPhotos] = useState<Photos[]>([]);
  const [photosFiltered, setPhotosFiltered] = useState<Photos[]>([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [photosPerPage, setphotosPerPage] = React.useState(200);
  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentphotos = photos?.slice(indexOfFirstPhoto, indexOfLastPhoto);

  const getUsersInfo = async () => {
    const url: AxiosResponse<Users[]> = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    const apiInfo = url.data;
    setUsers(apiInfo);
  };
  const getAlbumInfo = async () => {
    const url: AxiosResponse<Album[]> = await axios.get(
      "https://jsonplaceholder.typicode.com/albums"
    );
    const apiInfo = url.data;
    setAlbums(apiInfo);
  };
  const getPhotosInfo = async () => {
    const url: AxiosResponse<Photos[]> = await axios.get(
      "https://jsonplaceholder.typicode.com/photos"
    );
    const apiInfo = url.data;
    setPhotosFiltered(apiInfo.map((el) => el));
    setPhotos(apiInfo.map((el) => el));
  };

  const pages = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const orderByUsers = (e: ChangeEvent<HTMLSelectElement>) => {
    const result = albums.filter(
      (el) => e.target.value === el.userId.toString()
    );
    setAlbumsFiltered(result);
  };

  const orderByAlbum = (e: ChangeEvent<HTMLSelectElement>) => {
    const result = photos.filter(
      (el) => e.target.value === el.albumId.toString()
    );
    setPhotosFiltered(result);
    setCurrentPage(1);
  };

  useEffect(() => {
    getAlbumInfo();
    getPhotosInfo();
    getUsersInfo();
  }, []);

  return (
    <div className="main-div">
      <main className="secondary-div">
        <h1>Your Album </h1>
        <h3>Select an User to see his Album!</h3>
        <select defaultValue="Order by users" onChange={orderByUsers}>
          <option disabled value="Order by users">
            Order by Users
          </option>
          {users
            ? users.map((el, i) => (
                <option value={el.id} key={i}>
                  {" "}
                  {el.name}
                </option>
              ))
            : null}
        </select>
        <h3>Select an Album to see their photos!</h3>
        <select defaultValue="Order by album" onChange={orderByAlbum}>
          <option disabled value="Order by album">
            Order by Album
          </option>
          {albumsFiltered.length > 0
            ? albumsFiltered.map((el, i) => (
                <option value={el.id} key={i}>
                  {" "}
                  {el.title}{" "}
                </option>
              ))
            : albums?.map((el, i) => (
                <option value={el.id} key={i}>
                  {" "}
                  {el.title}{" "}
                </option>
              ))}
        </select>
        <section className="panel-photos">
          <Pages
            photosPerPage={photosPerPage}
            allPhotos={photos.length}
            pages={pages}
          />
          <div className="img-section-container">
            {photosFiltered
              ? photosFiltered.map((el, i) => (
                  <div key={i} className="img-container">
                    <h4>{el.title}</h4>
                    <div className="photo-div">
                      {" "}
                      <img src={el.url} className="photo-img" />
                    </div>
                  </div>
                ))
              : currentphotos.map((el, i) => (
                  <div key={i} className="img-container">
                    <h4>{el.title}</h4>
                    <div className="photo-div">
                      {" "}
                      <img src={el.url} className="photo-img" />
                    </div>
                  </div>
                ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
