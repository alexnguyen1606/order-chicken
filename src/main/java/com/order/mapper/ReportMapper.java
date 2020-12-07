package com.order.mapper;

import com.order.dto.ReportDTO;
import com.order.entities.Report;
import com.order.mapper.resolve.ReportResolve;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

/**
 * @author:Nguyen Anh Tuan
 * <p>
 * 9:04 AM ,November 25,2020
 */
@Mapper(uses = ReportResolve.class)
@Component
public interface ReportMapper extends CommonMapper<Report, ReportDTO> {
}
