import React from "react";
import "./Main.scss";
import LandpageGraph from "../../components/landpage_graph/LandpageGraph";
import { Button } from "@mui/material";

const Main: React.FC = () => {
  return (
    <>
      <div className="content">
        <div className="content__inner">
          <h1 className="content__title">
            Algorithm Graph <span>Vis</span>ualizer
          </h1>
          <p className="content__desc">
            View how different search algorithms traverse the states of problems
            such as Jealous Husbands, N-Queens
          </p>

          <Button
            className="content__button"
            variant="contained"
            href="/viewer"
          >
            Begin
          </Button>
        </div>

        <div className="content__graph">
          <LandpageGraph />
        </div>
      </div>
      <footer className="footer">
        <div className="footer__content">
          <p className="footer__text">
            &copy; <span className="footer__year">2023</span> Bachelor's project
            by Codrin Postu
          </p>
          <div className="footer__links">
            <a className="footer__link" href="https://github.com/codrin-postu">
              Github
            </a>
            <a className="footer__link" href="/admin/login">
              Admin
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Main;
