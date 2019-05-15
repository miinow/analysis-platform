import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { toThousands } from '../../utils/utils';
import { SvgIcon } from '../';
import './tablelist.scss';

class TableList extends Component {
    render() {
        return (
            <div className="table-list">
                <h1 className="table-title">{this.props.tableTitle}</h1>
                <Table dataSource={this.props.tableDataSource} columns={this.props.columns} pagination={false} />
            </div>
        );
    }
}
TableList.propTypes = {
    tableTitle: PropTypes.string,
    tableDataSource: PropTypes.array,
    columns: PropTypes.array
};
export default TableList;
