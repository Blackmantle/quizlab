import { RouteProps } from 'react-router-dom';

export default interface IPrivateRouteProps extends RouteProps {
  children: React.ReactNode,
}
