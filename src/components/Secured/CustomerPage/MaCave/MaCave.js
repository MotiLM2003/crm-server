import React, { useEffect, useState } from 'react';
import WaitingInventoryRequets from './WaitingInventoryRequets';
import ApprovedInventoryRequests from './ApprovedInventoryRequests';
import OffersRequets from './OffersRequets';
import RetraitsRequests from './RetraitsRequests';
import VentsRequets from './VentsRequets';

const MaCave = ({ headers, inventories }) => {
  const [menu, setMenu] = useState(0);
  const renderIsSelected = (x) => {
    return parseInt(x) === menu ? 'ma-cave__tab--selected' : '';
  };

  const renderTab = () => {
    switch (menu) {
      case 0: {
        return <ApprovedInventoryRequests headers={headers} />;
      }
      case 1: {
        return <WaitingInventoryRequets headers={headers} />;
      }
      case 2: {
        return <OffersRequets headers={headers} />;
      }
      case 3: {
        return <VentsRequets headers={headers} />;
      }
      case 4: {
        return <RetraitsRequests headers={headers} />;
      }
    }
  };

  const myCaveCount = inventories.filter((x) => x.status === 1).length;
  const waitingCont = inventories.filter((x) => x.status === 0).length;
  const offersCount = inventories.filter(
    (x) => x.status === 1 && x.offers.length > 0
  ).length;
  const ventsCount = inventories.filter((x) => x.status === 3).length;
  const retaitsCount = inventories.filter((x) => x.status === 2).length;

  return (
    <div>
      <section className='cards-container__toolbar'>&nbsp;</section>
      <div className='ma-cave'>
        <section className='ma-cave__tabs'>
          <div
            className={`ma-cave__tab ${renderIsSelected(0)}`}
            onClick={() => setMenu(0)}
          >
            <span className={`${myCaveCount > 0 ? 'tag-red' : 'tag-white'}`}>
              {myCaveCount}
            </span>
            Ma Cave
          </div>
          <div
            className={`ma-cave__tab ${renderIsSelected(1)}`}
            onClick={() => setMenu(1)}
          >
            En attente
            <span className={`${waitingCont > 0 ? 'tag-red' : 'tag-white'}`}>
              {waitingCont}
            </span>
          </div>
          <div
            className={`ma-cave__tab ${renderIsSelected(2)} blinker`}
            onClick={() => setMenu(2)}
          >
            Offres
            <span className={`${offersCount > 0 ? 'tag-red' : 'tag-white'}`}>
              {offersCount}
            </span>
          </div>
          <div
            className={`ma-cave__tab ${renderIsSelected(3)}`}
            onClick={() => setMenu(3)}
          >
            Ventes
            <span className={`${ventsCount > 0 ? 'tag-red' : 'tag-white'}`}>
              {ventsCount}
            </span>
          </div>
          <div
            className={`ma-cave__tab ${renderIsSelected(4)}`}
            onClick={() => setMenu(4)}
          >
            Retraits
            <span className={`${retaitsCount > 0 ? 'tag-red' : 'tag-white'}`}>
              {retaitsCount}
            </span>
          </div>
        </section>
        <section className='ma-cave__content'>{renderTab()}</section>
      </div>
    </div>
  );
};

export default MaCave;
