import Styled from 'styled-components';

import { BaseButton, GoggleSignInButton, InvertedButton } from "./../button/button.styles";

export const CartDropdownContainer = Styled.div`
  position: absolute;
  width: 240px;
  height: 340px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid black;
  background-color: white;
  top: 90px;
  right: 40px;
  z-index: 5;

  ${BaseButton},
  ${GoggleSignInButton},
  ${InvertedButton}{
    margin-top: auto;
  }
`

export const EmptyMessage = Styled.span`
  font-size: 18px;
  margin: 50px auto;
`
export const CartItems = Styled.div`
  height: 240px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`