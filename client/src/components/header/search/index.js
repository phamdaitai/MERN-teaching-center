import React, { Component } from 'react';
import { Input, Button, Icon } from "antd";

class Search extends Component {
  render() {
    return (
      <div className="header-search">
        <Input placeholder="Tìm kiếm giáo viên, khóa học..." type="text" />
        <Button className="header-search-submit">
          <Icon type="search" />
        </Button>
      </div>
    );
  }
}

export default Search;