package com.order.mapper.resolve;

import com.order.dto.ReportDTO;
import com.order.entities.Report;
import org.mapstruct.ObjectFactory;
import org.mapstruct.TargetType;
import org.springframework.stereotype.Component;

/**
 * @author:Nguyen Anh Tuan
 * <p>
 * 9:33 PM ,December 02,2020
 */
@Component
public class ReportResolve {
    @ObjectFactory
    public ReportDTO resolve(Report report, @TargetType Class<ReportDTO> type){
        ReportDTO reportDTO = new ReportDTO();
        reportDTO.setEndTimeString(report.getEndTime().toString());
        reportDTO.setStartTimeString(report.getStartTime().toString());
        return reportDTO;
    }
}
