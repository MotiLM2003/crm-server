import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import moment from 'moment';
import api from '../../../apis/api';
import { formatMoney } from '../../../utils/formatting';
import InputRange from 'react-input-range';
import { addInventoryGroup } from '../../../actions/customersActions';
import 'react-input-range/lib/css/index.css';
import Pagination from './Pagination';
import FormModel from '../../FormModel/FormModel';
import MaCave from './MaCave/MaCave';
import UserDetails from './UserDetails/UserDetailsMenu';

import {
  containerVariants,
  itemVariants,
  itemVariants2,
  itemVariants3,
  tdItem,
  tdOpacityVariant,
} from './variations';

const maxItems = 10;

const HomePage = (props) => {
  const [headers, setHeaders] = useState(null);
  const [groups, setGroups] = useState(null);
  const [currentGroups, setCurrentGroups] = useState(groups);
  const [totalPages, setTotalPages] = useState(groups);
  const [range, setRange] = useState({ min: 5, max: 52000 });
  const [currentPage, setcurrentPage] = useState(0);
  const [maxItems, setMaxItems] = useState(10);
  const [filters, setFilters] = useState({
    search: '',
    range: range,
  });

  const [isVisible, setIsVisible] = useState(false);
  const [selectedProducet, setSelectedProducet] = useState(null);
  const getHeaders = async () => {
    const { data } = await api.get('/headers/get-headers', {});
    setHeaders(data.headers);
  };

  const getGroups = async () => {
    try {
      let { data } = await api.get('/inventroy/get-groups', {});
      props.customer.inventories.map((i, index) => {
        data = data.filter((x) => {
          return x._id !== i.inventory._id;
        });
      });

      setGroups(data);
    } catch (err) {
      console.log('error', err);
    }
  };

  const initAddItem = (group) => {
    setIsVisible(true);
    setSelectedProducet(group);
  };

  const addItem = () => {
    const newInventory = {
      status: 0,
      customer: props.customer._id,
      inventory: selectedProducet._id,
      expiration: moment().add(5, 'd'),
    };
    setGroups(groups.filter((x) => x._id !== selectedProducet._id));
    props.addInventoryGroup(newInventory);

    setIsVisible(false);
  };

  useEffect(() => {
    getHeaders();
    getGroups();
    pageChanged(1);
  }, []);

  useEffect(() => {
    if (!groups) return;
    const skip = maxItems * currentPage;

    setTotalPages(groups);
    setCurrentGroups(groups.slice(skip, skip + maxItems));
  }, [currentPage, groups]);

  const pageChanged = (page) => {
    setcurrentPage(page);
  };

  const onSearchChange = (e) => {
    const search = e.target.value;
    setFilters({ ...filters, search });
  };

  useEffect(() => {
    if (!groups) return;
    const temp = groups.filter((x) => {
      const col1 = x.items[0].text;
      const price = parseInt(x.items[3].text);
      const min = parseInt(filters.range.min);
      const max = parseInt(filters.range.max);
      const isMin = price >= min;
      const isMax = price <= max;

      const isTrue =
        col1?.toLowerCase().indexOf(filters?.search.toLowerCase()) > -1;

      return isTrue && isMin && isMax;
    });
    const skip = maxItems * 1;
    setcurrentPage(0);
    setTotalPages(temp);
    setCurrentGroups(temp.slice(0, maxItems));
  }, [filters, groups]);

  const renderHeaders = () => {
    return (
      headers &&
      headers.map((header) => {
        return <th>{header}</th>;
      })
    );
  };

  const renderInventory = () => {
    return (
      currentGroups &&
      currentGroups.map((group) => {
        return (
          <motion.tr key={group._id} variants={tdItem}>
            {group.items.map((item, index) => {
              let text = item.text;
              if (index === 3) {
                text = formatMoney(item.text);
              }
              return (
                <AnimatePresence>
                  <motion.td variants={tdOpacityVariant}>{`${text}`}</motion.td>
                </AnimatePresence>
              );
            })}
            <td
              className='home-page-container__add-item'
              onClick={() => initAddItem(group)}
            >
              Acheter
            </td>
          </motion.tr>
        );
      })
    );
  };
  return (
    <div className='home-page-container'>
      <motion.div
        className='cards-container'
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        <motion.div
          className='cards-container__card tilt'
          variants={itemVariants}
        >
          <div className='cards-container__content'>
            <h2>
              <i class='fas fa-wine-glass-alt'></i> CHAMPAGNE
            </h2>
            <section className='cards-container__toolbar'>
              <div className='cards-container__filters'>
                Prix:
                <div
                  style={{
                    width: '20rem',
                    fontSize: '2rem',
                    marginLeft: '1.5rem',
                  }}
                >
                  <InputRange
                    maxValue={52000}
                    formatLabel={(value) => formatMoney(value)}
                    minValue={0}
                    value={filters.range}
                    onChange={(value) => {
                      setFilters({ ...filters, range: value });
                    }}
                  />
                </div>
              </div>
              <div className='cards-container__search-container'>
                <input
                  type='text'
                  className='cards-container__search'
                  placeholder='Rechercher...'
                  value={filters.search}
                  onChange={onSearchChange}
                />
              </div>
            </section>
            <div class='cards-container__items'>
              <table className='cards-container__inventory-list'>
                <thead>
                  <tr>
                    {renderHeaders()}
                    <th>Acheter</th>
                  </tr>
                </thead>
                <tbody>{renderInventory()}</tbody>
              </table>
            </div>
            <div>
              <Pagination
                list={totalPages}
                currentPage={currentPage}
                pageChanged={pageChanged}
                maxItems={maxItems}
              />
            </div>
          </div>
        </motion.div>

        <motion.div className='cards-container__card' variants={itemVariants2}>
          <div className='cards-container__content'>
            <h2>
              <i class='fas fa-wine-bottle'></i>MA CAVE
            </h2>

            <MaCave
              headers={headers}
              inventories={props.customer.inventories}
            />
          </div>
        </motion.div>
        <motion.div className='cards-container__card' variants={itemVariants3}>
          <div className='cards-container__content'>
            <h2>
              <i class='fas fa-file-invoice-dollar'></i>MON COMPTE
            </h2>
            <UserDetails />
            <div className=''></div>
          </div>
        </motion.div>
      </motion.div>
      <FormModel isVisible={isVisible}>
        <div className='home-page-container__customer_add_item'>
          <h2 className='add-item-header'>CONFIRMATION REQUISE</h2>
          <p>Réserver ce lot?</p>
          <div className='add-item-buttons'>
            <button className='button bg-success' onClick={addItem}>
              Qui
            </button>
            <button
              className='button bg-warning'
              onClick={() => {
                setIsVisible(false);
              }}
            >
              Non
            </button>
          </div>
        </div>
      </FormModel>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    customer: state.customerReducer,
  };
};

export default connect(mapStateToProps, { addInventoryGroup })(HomePage);
