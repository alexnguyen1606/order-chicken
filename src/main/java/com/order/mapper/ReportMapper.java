package com.order.mapper;

import com.order.dto.ReportDTO;
import com.order.entities.Report;
import org.mapstruct.Mapper;
import org.springframework.stereotype.Component;

@Mapper
@Component
public interface ReportMapper extends CommonMapper<Report, ReportDTO> {
}
