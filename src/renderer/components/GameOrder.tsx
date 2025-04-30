import { GameOrderBy, GameOrderReverse } from 'flashpoint-launcher';
import * as React from 'react';
import { LangContext } from '../util/lang';
import { useContext } from 'react';

export type GameOrderProps = {
  /** Called when the either the property to order by, or what way to order in, is changed. */
  onChange?: (event: GameOrderChangeEvent) => void;
  /** What property to order the games by. */
  orderBy: GameOrderBy;
  /** What way to order the games in. */
  orderReverse: GameOrderReverse;
};

/** Object emitted when the game order changes. */
export type GameOrderChangeEvent = {
  orderBy: GameOrderBy;
  orderReverse: GameOrderReverse;
};

/**
 * Two drop down lists, the first for selecting what to order the games by, and
 * the second for selecting what way to order the games in.
 */
export function GameOrder(props: GameOrderProps) {
  const allStrings = useContext(LangContext);
  const strings = allStrings.filter;

  const onOrderByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateOrder({ orderBy: event.target.value as GameOrderBy }); // Let the parser deal with invalid values instead. How would this even happen?
  };

  const onOrderReverseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (isOrderReverse(event.target.value)) {
      updateOrder({ orderReverse: event.target.value });
    } else {
      console.error(`Failed to set "Order Reverse". Value is invalid! (value: "${event.target.value}")`);
    }
  };

  const updateOrder = (data: Partial<GameOrderChangeEvent>) => {
    if (props.onChange) {
      props.onChange({
        orderBy:      data.orderBy      || props.orderBy,
        orderReverse: data.orderReverse || props.orderReverse,
      });
    }
  };

  return (
    <>
      {/* Order By */}
      <select
        className='search-selector search-bar-order-dropdown'
        value={props.orderBy}
        onChange={onOrderByChange}>
        <option value='title'>{strings.title}</option>
        <option value='developer'>{strings.developer}</option>
        <option value='publisher'>{strings.publisher}</option>
        <option value='series'>{strings.series}</option>
        <option value='platform'>{strings.platform}</option>
        <option value='releaseDate'>{allStrings.browse.releaseDate}</option>
        <option value='dateAdded'>{strings.dateAdded}</option>
        <option value='dateModified'>{strings.dateModified}</option>
        <option value='lastPlayed'>{allStrings.browse.lastPlayed}</option>
        <option value='playtime'>{allStrings.browse.playtime}</option>
      </select>
      {/* Order Reverse */}
      <select
        className='search-selector search-bar-order-dropdown'
        value={props.orderReverse}
        onChange={onOrderReverseChange}>
        <option value='ASC'>{strings.ascending}</option>
        <option value='DESC'>{strings.descending}</option>
      </select>
    </>
  );
}

function isOrderReverse(value: string): value is GameOrderReverse {
  return (value === 'ASC' || value === 'DESC');
}
