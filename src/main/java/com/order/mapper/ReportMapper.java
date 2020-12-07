package com.order.mapper;

import com.order.dto.ReportDTO;
import com.order.entities.Report;
import com.order.mapper.resolve.ReportResolve;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;


@Mapper(uses = ReportResolve.class)
@Component
public interface ReportMapper extends CommonMapper<Report, ReportDTO> {
}
