import React from 'react';

import '../css/pages/notFound.css';

class NotFound extends React.Component {
  render() {
    return (
      <div className="page-not-found" data-testid="page-not-found">
        <h1>Erro 404</h1>
        <h2>Página não encontrada</h2>
      </div>
    );
  }
}

export default NotFound;
